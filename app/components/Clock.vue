<template>
    <Page>
        <ActionBar class="ActionBar" title="Time Manager"></ActionBar>
        <FlexboxLayout class="page">
            <StackLayout class="form">
            <Button :text="state ? 'Clock In' : 'Clock Out'" @tap="submit" class="btn btn-primary m-t-50"></Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                 state : true
            };
        },
        methods: {
            submit() {
                if (this.state === true) {
                    this.state = false;
                }
                else{
                    this.state = true;
                }
            }
        }
    }
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

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #F9D342;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }
</style>