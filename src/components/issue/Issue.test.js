import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Issue from "./Issue";
import StatusBtn from "../btns/StatusBtn";
import StatusSelector from "../status_selector/StatusSelector";

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
        it("should render 8 div elements", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find("div").length).toEqual(8);
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

    describe("renders after click", () => {
        it("should render the stage selector when a stage btn is clicked", () => {
            const wrapper = mount(<Issue />);
            wrapper.find(StatusBtn).at(0).simulate("click");
            expect(wrapper.find(StatusSelector).length).toEqual(1);
        });

        it("should render the priority selector when a priority btn is clicked", () => {
            const wrapper = mount(<Issue />);
            wrapper.find(StatusBtn).at(1).simulate("click");
            expect(wrapper.find(StatusSelector).length).toEqual(1);
        });

        it("should render the issue options list when a issue options btn is clicked", () => {
            const wrapper = mount(<Issue />);
            wrapper
                .find({ className: "issue-menu fas fa-ellipsis-v" })
                .at(0)
                .simulate("click");
            expect(
                wrapper.find({ className: "issue-options-container" }).length
            ).toEqual(1);
        });

        it("should render the date options list when a date options btn is clicked", () => {
            const wrapper = mount(<Issue />);
            wrapper
                .find({ className: "issue-menu fas fa-ellipsis-v" })
                .at(1)
                .simulate("click");
            expect(
                wrapper.find({ className: "date-options-container" }).length
            ).toEqual(1);
        });
    });
});
