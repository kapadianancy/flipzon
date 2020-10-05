import { configure, shallow }  from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Auth from './containers/Auth';
import Test from './TestComponent';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgotPassword from './components/Auth/ForgotPassword'
import ProductCategoriesList from './containers/ProductCategories'

configure({ adapter: new Adapter() });

// describe('Refunded Emd tests',()=>{
//     it('Should render <h1>Bhavik</h1> when passed Bhavik as name', function() {
//         const wrapper = shallow(<Test />);// Arranging the expected value
//         const expectedContainedSpan =  <h1>Bhavik</h1>// Act
//         const actualValue = wrapper.contains(expectedContainedSpan);// Assert
//         expect(actualValue).to.equal(true);
//     });
// })
describe("should manage authentication", () => {
    it("should render forgot password component correctly", function() {
        const wrapper = shallow(<ForgotPassword />);
        const expectedToBeIn = <h3>ForgotPassword</h3>
        console.log(wrapper.html());
        // const actualValue = wrapper.contains(expectedToBeIn);
        // expect(actualValue).to.equal(true);
    });
    it("should render register component correctly", function() {
        const wrapper = shallow(<Register />);
        const expectedToBeIn = <h3>Register</h3>
        const actualValue = wrapper.contains(expectedToBeIn);
        expect(actualValue).to.equal(true);
    });
    it("should render login component correctly", function() {
        const wrapper = shallow(<Login />);
        const expectedToBeIn = <h3>Login</h3>
        const actualValue = wrapper.contains(expectedToBeIn);
        expect(actualValue).to.equal(true);
    });
});
