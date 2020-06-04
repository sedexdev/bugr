import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Ribbon from "./Ribbon";

describe("Ribbon component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Ribbon />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<Ribbon />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("Ribbon HTML elements", () => {
        it("should render a header element", () => {
            const wrapper = mount(<Ribbon />);
            expect(wrapper.find("header").length).toEqual(1);
        });

        it("should render 2 div elements", () => {
            const wrapper = mount(<Ribbon />);
            expect(wrapper.find("div").length).toEqual(2);
        });
        it("should render 5 button elements", () => {
            const wrapper = mount(<Ribbon />);
            expect(wrapper.find("button").length).toEqual(5);
        });
        it("should render 3 i elements", () => {
            const wrapper = mount(<Ribbon />);
            expect(wrapper.find("i").length).toEqual(3);
        });
    });
});
