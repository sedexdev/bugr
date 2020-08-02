import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Delete from "./Delete";

describe("Delete component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Delete />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly", () => {
        const tree = renderer.create(<Delete />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("Delete HTML elements", () => {
        it("should render 2 dev elements", () => {
            const wrapper = mount(<Delete />);
            expect(wrapper.find("div").length).toEqual(2);
        });

        it("should render a p element", () => {
            const wrapper = mount(<Delete />);
            expect(wrapper.find("p").length).toEqual(1);
        });

        it("should render 2 button elements", () => {
            const wrapper = mount(<Delete />);
            expect(wrapper.find("button").length).toEqual(2);
        });

        it("should render 2 i elements", () => {
            const wrapper = mount(<Delete />);
            expect(wrapper.find("i").length).toEqual(2);
        });
    });
});
