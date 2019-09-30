<template>
    <Page>
        <ActionBar class="ActionBar" title="Time Manager"></ActionBar>
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/assets/images/logotham.png"></Image>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email"
                               returnKeyType="next" @returnPress="focusPassword" fontSize="18"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'"
                               @returnPress="focusConfirmPassword" fontSize="18"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done"
                               fontSize="18"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="created" class="btn btn-primary m-t-20"></Button>
                <Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword"></Label>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
                    <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Clock from "./Clock";
    import axios from 'axios';
    const userService = {
        register(user) {
            return Promise.resolve(user);
        },
        login(user) {
            return Promise.resolve(user);
        },
        resetPassword(email) {
            return Promise.resolve(email);
        }
    };

    export default {
        data() {
            return {
                isLoggingIn: true,
                wrongpassoremail : false,
                token : '',
                user: {
                    email: "administrator@email.fr",
                    password : 'password',
                }

            };
        },
        methods: {
            created: function (event) {
                let user = this.user;
                axios.post(`http://3.84.184.79:3000/users/sign_in`,  {
                    user
                })
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response);
                            console.log(response.data.token);
                            this.wrongpassoremail = false;
                            const appSettings = require("application-settings");
                            appSettings.setItem('user', response.data.user);
                            appSettings.setItem('jwt',response.data.token);
                            if (appSettings.getString('jwt') != null){
                                this.submit();
                            }
                        }
                    })
                    .catch(e => {
                        this.wrongpassoremail = true;
                        console.log(e);
                    })
            },
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },

            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Please provide both an email address and password."
                    );
                    return;
                }
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            login() {
                userService
                    .login(this.user)
                    .then(() => {
                        this.$navigateTo(Clock);
                    })
                    .catch(() => {
                        this.alert("Unfortunately we could not find your account.");
                    });
            },

            register() {
                if (this.user.password != this.user.confirmPassword) {
                    this.alert("Your passwords do not match.");
                    return;
                }

                userService
                    .register(this.user)
                    .then(() => {
                        this.alert("Your account was successfully created.");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.alert(
                            "Unfortunately we were unable to create your account."
                        );
                    });
            },

            forgotPassword() {
                prompt({
                    title: "Forgot Password",
                    message:
                        "Enter the email address you used to register for reset your password.",
                    inputType: "email",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Cancel"
                }).then(data => {
                    if (data.result) {
                        userService
                            .resetPassword(data.text.trim())
                            .then(() => {
                                this.alert(
                                    "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                                );
                            })
                            .catch(() => {
                                this.alert(
                                    "Unfortunately, an error occurred resetting your password."
                                );
                            });
                    }
                });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "Time Manager",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
    .ActionBar{
        background-color: #F9D342;
    }
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 54;
    }

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #F9D342;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
