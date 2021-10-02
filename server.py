from flask import Flask, render_template

app = Flask(__name__, static_folder="static")


@app.route('/')
@app.route('/index')
def main_page():
    return render_template('index.html')


@app.route('/snake')
def snake_game():
    return render_template('snake.html')


@app.route('/memory')
def memory_game():
    return render_template('memory.html')


@app.route('/puzzle/<directory>')
def puzzle_game(directory):
    return render_template('puzzle.html', directory=directory)


@app.route('/puzzle')
def all_pictures():
    return render_template('all-pictures.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1',
            port=5050)
