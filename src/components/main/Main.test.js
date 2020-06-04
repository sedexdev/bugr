import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Main from "./Main";
import IssueGroup from "../issue_group/IssueGroup";
import Issue from "../issue/Issue";

describe("Main component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Main />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<Main />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("Main HTML elements", () => {
        it("should render a main element", () => {
            const wrapper = mount(<Main />);
            expect(wrapper.find("main").length).toEqual(1);
        });

        it("should render 2 IssueGroup component", () => {
            const wrapper = mount(<Main />);
            expect(wrapper.find(IssueGroup).length).toEqual(2);
        });

        it("should render 4 Issue component", () => {
            const wrapper = mount(<Main />);
            expect(wrapper.find(Issue).length).toEqual(4);
        });
    });
});
