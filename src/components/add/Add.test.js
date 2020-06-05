import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Add from "./Add";

describe("Add component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Add />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<Add />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("Add HTML elements", () => {
        it("should render a div element", () => {
            const wrapper = mount(<Add />);
            expect(wrapper.find("div").length).toEqual(1);
        });

        it("should render an input element", () => {
            const wrapper = mount(<Add />);
            expect(wrapper.find("input").length).toEqual(1);
        });

        it("should render 2 button elements", () => {
            const wrapper = mount(<Add />);
            expect(wrapper.find("button").length).toEqual(2);
        });
    });
});
