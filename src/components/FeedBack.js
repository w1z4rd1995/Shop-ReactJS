import { store } from "../Stores/AppStore";
import { observer } from "mobx-react-lite";
import { Formik, Field, Form } from "formik";

export const FeedBack = observer((props) => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    phone: "",
                    email: "",
                    text: "",
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form className="feedBackContainer">
                    <div className="feedBackName">
                        <Field name="firstName" placeholder="Имя" />
                    </div>
                    <div className="feedBackPhone">
                        <input type="tel" name="phone" placeholder="Телефон" />
                    </div>
                    <div className="feedBackMail">
                        <Field name="email" placeholder="Почта" type="email" />
                    </div>
                    <div className="feedBackText">
                        <Field
                            as="textarea"
                            name="text"
                            placeholder="Ваше сообщение"
                        />
                    </div>
                    <div className="feedBackButton">
                        <button type="submit">Отправить</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
});
