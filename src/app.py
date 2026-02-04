from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def form():
    job = None

    if request.method == "POST":
        job = {
            "company": request.form["company"],
            "position": request.form["position"],
            "url": request.form["url"],
            "location": request.form["location"],
            "status": request.form["status"],
            "notes": request.form.get("notes")
        }

    return render_template("form.html", job=job)


if __name__ == "__main__":
    app.run(debug=True)