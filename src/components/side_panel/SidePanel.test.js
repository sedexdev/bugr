import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import SidePanel from "./SidePanel";
import Delete from "../delete/Delete";

describe("SidePanel component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<SidePanel />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly", () => {
        const tree = renderer.create(<SidePanel />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("SidePanel HTML elements", () => {
        it("should render an aside element", () => {
            const wrapper = mount(<SidePanel />);
            expect(wrapper.find("aside").length).toEqual(1);
        });

        it("should render a h1 element", () => {
            const wrapper = mount(<SidePanel />);
            expect(wrapper.find("h1").length).toEqual(1);
        });

        it("should render 3 div elements", () => {
            const wrapper = mount(<SidePanel />);
            expect(wrapper.find("div").length).toEqual(3);
        });

        it("should render 2 i elements", () => {
            const wrapper = mount(<SidePanel />);
            expect(wrapper.find("i").length).toEqual(2);
        });

        it("should render a Link component", () => {
            const wrapper = mount(<SidePanel />);
            expect(wrapper.find(Link).length).toEqual(1);
        });
    });

    describe("click events", () => {
        it("should render the Delete component when delete project button clicked", () => {
            const wrapper = mount(<SidePanel />);
            wrapper
                .find({ className: "delete-project fas fa-times-circle" })
                .at(0)
                .simulate("click");
            expect(wrapper.find(Delete).length).toEqual(1);
        });
    });
});
