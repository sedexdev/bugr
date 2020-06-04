import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Issue from "./Issue";
import StatusBtn from "../btns/StatusBtn";

describe("Issue component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Issue />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<Issue />);
        expect(tree).toMatchSnapshot();
    });

    describe("Issue HTML elements", () => {
        it("should render 6 div elements", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find("div").length).toEqual(6);
        });

        it("should render 2 i elements", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find("i").length).toEqual(2);
        });

        it("should render 2 StatusBtn components", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find(StatusBtn).length).toEqual(2);
        });
    });
});
