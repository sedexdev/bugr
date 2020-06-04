import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import StatusBtn from "./StatusBtn";

describe("StatusBtn component", () => {
    let props;
    beforeEach(() => {
        props = {
            id: "test",
            value: "Testing",
        };
    });
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<StatusBtn {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<StatusBtn {...props} />);
        expect(tree).toMatchSnapshot();
    });

    describe("StatusBtn HTML elements", () => {
        it("should render a button element", () => {
            const wrapper = mount(<StatusBtn {...props} />);
            expect(wrapper.find("button").length).toEqual(1);
        });
    });
});
