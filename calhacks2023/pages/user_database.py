from calhacks2023.templates import template

import reflex as rx

from calhacks2023.state import State
import pandas as pd

dat = pd.read_csv("calhacks2023/pages/data.csv")

class FormState(State):

    form_data: dict = {}

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data
        dat = pd.read_csv("calhacks2023/pages/data.csv")
        if self.form_data["get"] == False:
            new_record = pd.DataFrame([{'Name':form_data["name"], 'Email':form_data["email"]}])
            dat = pd.concat([dat, new_record], ignore_index= True)
            dat.to_csv("calhacks2023/pages/data.csv")



class CheckboxState(State):
    checked: bool = False

    def toggle(self):
        self.checked = not self.checked




@template(route="/user_database", title="User Database")
def user_database():
    return rx.vstack(
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="Name",
                    id="name",
                ),
                rx.input(
                    placeholder="Email", id="email"
                ),
                rx.hstack(
                    rx.checkbox("Get Data", on_change=CheckboxState.set_checked, id="get"),
                ),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
        rx.cond(FormState.form_data["get"],
                rx.table(data = dat.loc[dat["Name"] == FormState.form_data["name"]],
                        pagination=True,
                        search=True,
                        sort=True),
                rx.text("ADDED")
                )
    )