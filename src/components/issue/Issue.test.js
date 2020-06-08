import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Issue from "./Issue";
import StatusBtn from "../btns/StatusBtn";
import StatusSelector from "../status_selector/StatusSelector";
import IssueOptions from "./IssueOptions";

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
        it("should render 30 div elements", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find("div").length).toEqual(30);
        });

        it("should render 6 i elements", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find("i").length).toEqual(6);
        });

        it("should render 2 StatusBtn components", () => {
            const wrapper = mount(<Issue />);
            expect(wrapper.find(StatusBtn).length).toEqual(2);
        });
    });

    describe("renders after click", () => {
        let props;
        beforeEach(() => {
            props = {
                setStagesId: jest.fn(),
                setPrioritiesId: jest.fn(),
                setIssueOptionsId: jest.fn(),
                setDateOptionsId: jest.fn(),
            };
        });

        it("should render the stage selector when a stage btn is clicked", () => {
            const wrapper = mount(<Issue {...props} />);
            wrapper.find(StatusBtn).at(0).simulate("click");
            expect(wrapper.find(StatusSelector).length).toEqual(2);
        });

        it("should render the priority selector when a priority btn is clicked", () => {
            const wrapper = mount(<Issue {...props} />);
            wrapper.find(StatusBtn).at(1).simulate("click");
            expect(wrapper.find(StatusSelector).length).toEqual(2);
        });

        it("should render the issue options list when a issue options btn is clicked", () => {
            const wrapper = mount(<Issue {...props} />);
            wrapper
                .find({ className: "issue-menu fas fa-ellipsis-v" })
                .at(0)
                .simulate("click");
            expect(wrapper.find(IssueOptions).length).toEqual(2);
        });

        it("should render the date options list when a date options btn is clicked", () => {
            const wrapper = mount(<Issue {...props} />);
            wrapper
                .find({ className: "issue-menu fas fa-ellipsis-v" })
                .at(1)
                .simulate("click");
            expect(wrapper.find(IssueOptions).length).toEqual(2);
        });
    });
});

describe("IssueOptions component", () => {
    let props;
    beforeEach(() => {
        props = {
            options: ["Test1", "Test2"],
        };
    });
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<IssueOptions {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<IssueOptions {...props} />);
        expect(tree).toMatchSnapshot();
    });

    describe("IssueOptions HTML elements", () => {
        it("should render a div element", () => {
            const wrapper = mount(<IssueOptions {...props} />);
            expect(wrapper.find("div").length).toEqual(1);
        });

        it("should render an i element", () => {
            const wrapper = mount(<IssueOptions {...props} />);
            expect(wrapper.find("i").length).toEqual(1);
        });

        it("should render a ul element", () => {
            const wrapper = mount(<IssueOptions {...props} />);
            expect(wrapper.find("ul").length).toEqual(1);
        });

        it("should render 2 li elements", () => {
            const wrapper = mount(<IssueOptions {...props} />);
            expect(wrapper.find("li").length).toEqual(2);
        });
    });
});
