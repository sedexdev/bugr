import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import IssueGroup from "./IssueGroup";
import Issue from "../issue/Issue";
import Delete from "../delete/Delete";
import Add from "../add/Add";

const issueGroups = require("../../test_project_data/project_a.json");

describe("IssueGroup component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<IssueGroup />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<IssueGroup />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("IssueGroup HTML elements", () => {
        it("should render a section element", () => {
            const wrapper = mount(<IssueGroup />);
            expect(wrapper.find("section").length).toEqual(1);
        });
        it("should render a h2 element", () => {
            const wrapper = mount(<IssueGroup />);
            expect(wrapper.find("h2").length).toEqual(1);
        });

        it("should render 6 i elements", () => {
            const wrapper = mount(<IssueGroup />);
            expect(wrapper.find("i").length).toEqual(6);
        });

        it("should render 6 div elements", () => {
            const wrapper = mount(<IssueGroup />);
            expect(wrapper.find("div").length).toEqual(6);
        });

        it("should render 2 Issue components", () => {
            const wrapper = mount(
                <IssueGroup issues={issueGroups["groups"][0].issues} />
            );
            expect(wrapper.find(Issue).length).toEqual(2);
        });
    });

    describe("renders after click", () => {
        let props;
        beforeEach(() => {
            props = {
                setAddGroupId: jest.fn(),
                setDeleteGroupId: jest.fn(),
            };
        });
        it("should render the Delete component when the delete group button is clicked", () => {
            const wrapper = mount(<IssueGroup {...props} />);
            wrapper
                .find({ className: "delete-group fas fa-times-circle" })
                .simulate("click");
            expect(wrapper.find(Delete).length).toEqual(1);
        });

        it("should render the Add component when the add group button is clicked", () => {
            const wrapper = mount(<IssueGroup {...props} />);
            wrapper
                .find({ className: "add-group fas fa-plus-circle" })
                .simulate("click");
            expect(wrapper.find(Add).length).toEqual(1);
        });
    });
});
