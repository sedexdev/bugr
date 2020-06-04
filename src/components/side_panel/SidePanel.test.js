import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import SidePanel from "./SidePanel";

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
    });
});
