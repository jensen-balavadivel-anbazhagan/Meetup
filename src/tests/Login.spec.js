import { shallowMount } from '@vue/test-utils';
import Login from "./../components/Login";


describe('Login.vue', () => {
  it('Login page should be displayed with input for user details', () => {
    const wrapper = shallowMount(Login);
    const name = wrapper.find("#name-input");
    const email = wrapper.find("#email-input");
    const gdpr = wrapper.find("#gdpr");
    const signIn = wrapper.find("button");
    expect(name.exists()).toBe(true);
    expect(email.exists()).toBe(true);
    expect(gdpr.exists()).toBe(true);
    expect(signIn.exists()).toBe(true);
  })

  it('Check if createMethod is called when all the inputs are available', () => {
    let spy = jest.spyOn(document, 'getElementById');
    const createUser = jest.spyOn(Login.methods, 'createUser');
    let nameEle = document.createElement("name-input");
    spy.mockReturnValue(nameEle);
    let emailEle = document.createElement("email-input");
    spy.mockReturnValue(emailEle);
    let gdprEle = document.createElement("gdpr");
    spy.mockReturnValue(gdprEle);
    const wrapper = shallowMount(Login);
    const name = wrapper.find("#name-input");
    name.setValue("Test");
    const email = wrapper.find("#email-input");
    email.setValue("test@test.com");
    const gdpr = wrapper.find("#gdpr");
    gdpr.trigger('click');
    const signIn = wrapper.find("button");
    signIn.trigger('click');
    expect(createUser).toHaveBeenCalled;
  })

  it('Check if validateName is fired when name is input', () => {
    let spy = jest.spyOn(document, 'getElementById');
    const validateName = jest.spyOn(Login.methods, 'validateName');
    let nameEle = document.createElement("name-input");
    spy.mockReturnValue(nameEle);
    const wrapper = shallowMount(Login);
    const name = wrapper.find("#name-input");
    name.setValue("Test");
    expect(validateName).toHaveBeenCalled;
  })

  it('Check if errorMsg is created for wrong input of name', () => {
    let spy = jest.spyOn(document, 'getElementById');
    let nameEle = document.createElement("name-input");
    spy.mockReturnValue(nameEle);
    const wrapper = shallowMount(Login);
    const name = wrapper.find("#name-input");
    name.setValue("");
    expect(wrapper.vm.$data.validate.name).toBe(false);
    expect(wrapper.vm.$data.messages.nameMessage).toBe("Name cannot be empty");
  })

  it('Check if validateEmail is fired when email is input', () => {
    let spy = jest.spyOn(document, 'getElementById');
    const validateEmail = jest.spyOn(Login.methods, 'validateEmail');
    let emailEle = document.createElement("email-input");
    spy.mockReturnValue(emailEle);
    const wrapper = shallowMount(Login);
    const email = wrapper.find("#email-input");
    email.setValue("Test");
    expect(validateEmail).toHaveBeenCalled;
  })

  it('Check if errorMsg is created for wrong input of email', () => {
    let spy = jest.spyOn(document, 'getElementById');
    const validateEmail = jest.spyOn(Login.methods, 'validateEmail');
    let emailEle = document.createElement("email-input");
    spy.mockReturnValue(emailEle);
    const wrapper = shallowMount(Login);
    const email = wrapper.find("#email-input");
    email.setValue("");
    expect(wrapper.vm.$data.validate.email).toBe(false);
    expect(wrapper.vm.$data.messages.emailMessage).toBe("email cannot be empty");
  })


}) 
