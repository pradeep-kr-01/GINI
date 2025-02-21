import os  # Import the os module
from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup
import json
import openai
import textwrap

app = Flask(__name__)

# Load OpenAI API key from environment variable (DO NOT HARDCODE IT!)
openai.api_key = os.getenv("OPENAI_API_KEY")

def scrape_website(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Check if the request was successful
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.get_text(separator=' ', strip=True)
        return content
    except requests.RequestException as e:
        return str(e)

def generate_questions(content, num_questions=10, chunk_size=1500):
    questions = []
    chunks = textwrap.wrap(content, chunk_size)

    client = openai.OpenAI()  # New OpenAI client

    for chunk in chunks:
        prompt = f"Generate {num_questions} concise questions (less than 80 characters) based on the following content:\n\n{chunk}"

        response = client.chat.completions.create(  # Updated API call
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )

        chunk_questions = response.choices[0].message.content.strip().split('\n')
        questions.extend([q for q in chunk_questions if q.strip() != ''])

        if len(questions) >= num_questions:
            break

    return questions[:num_questions]

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for the question generator page
@app.route('/getstarted', methods=['GET', 'POST'])
def generate_questions_from_url():
    if request.method == 'POST':
        url = request.form.get('url')

        if not url:
            return jsonify({"error": "URL is required"}), 400

        content = scrape_website(url)
        if 'Error' in content:
            return jsonify({"error": content}), 500

        questions = generate_questions(content)

        return render_template('getstarted.html', url=url, questions=questions)

    return render_template('getstarted.html')

# Run the Flask app on Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render assigns a dynamic port
    app.run(host='0.0.0.0', port=port, debug=True)

