from calhacks2023.templates import template

import reflex as rx
import pandas as pd


df = pd.DataFrame({"Name":["Daisy", "Daisy", "Kaylie"], "Task":["Stat HW", "Math HW", "Fluids HW"], "Day":["Oct-27", "Oct-27", "Oct-27"]})

@template(route="/chatapp", title="ChatApp")

def input_form() -> rx.Component:
    name_input = rx.input(placeholder="Name")
    age_input = rx.input(placeholder="Age", type="number")
    submit_button = rx.button("Submit", on_click=save_user)

    return rx.form(
        name_input,
        age_input,
        submit_button,
    )
users = []  # List to store user data

def save_user(event):
    name = event.current_target.parentElement[0].value
    age = event.current_target.parentElement[1].value
    users.append((name, age))
    event.current_target.parentElement[0].value = ""  # Clear the name input
    event.current_target.parentElement[1].value = ""  # Clear the age input

def user_list() -> rx.Component:
    user_items = [rx.p(f"Name: {user[0]}, Age: {user[1]}") for user in users]
    return rx.div(user_items)


def user_database() -> rx.Component:
    return rx.div(
        input_form(),
        user_list(),
    )

if __name__ == "__main__":
    app = rx.App()
    app.run(user_database)