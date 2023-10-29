from calhacks2023.templates import template

import reflex as rx

from calhacks2023.state import State
import pandas as pd



class FormState(State):

    form_data: dict = {}
    output = pd.DataFrame({'Name':[], 'Email':[]})
    dat = pd.read_csv("calhacks2023/pages/data.csv")
    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data
        if self.form_data["get"]:
            self.output = self.dat.loc[self.dat["Name"] == self.form_data["name"]]
        else:
            new_record = pd.DataFrame([{'Name':self.form_data["name"], 'Email':self.form_data["email"]}])
            self.dat = pd.concat([self.dat, new_record], ignore_index=True)
            self.dat.to_csv("calhacks2023/pages/data.csv")
            self.output = self.dat.loc[self.dat["Name"] == self.form_data["name"]]



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
                rx.input(
                    placeholder="Task", id="task"
                ),
                rx.hstack(rx.input(
                    placeholder="Date", id="date"
                    ),
                    rx.input(
                        placeholder="Time Start", id="start"
                    ),
                    rx.input(
                        placeholder="Time End", id="end"
                    )
                ),
                rx.hstack(
                    rx.checkbox("Clicking This Won't Add More Data", id="get"),
                ),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
        rx.data_table(data = FormState.output,
                        pagination=True,
                        search=True,
                        sort=True),
    )