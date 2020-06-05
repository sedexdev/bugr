import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import StatusSelector from "./StatusSelector";
import StatusOption from "./StatusOption";

describe("StatusSelector component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<StatusSelector />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<StatusSelector />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("StatusSelector HTML elements", () => {
        it("should render an i element", () => {
            const wrapper = mount(<StatusSelector />);
            expect(wrapper.find("i").length).toEqual(1);
        });

        it("should render 4 StatusOption components", () => {
            const wrapper = mount(<StatusSelector />);
            expect(wrapper.find(StatusOption).length).toEqual(4);
        });
    });
});

describe("StatusOption component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<StatusOption />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<StatusOption />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("StatusOption HTML elements", () => {
        it("should render 2 div elements", () => {
            const wrapper = mount(<StatusOption />);
            expect(wrapper.find("div").length).toEqual(2);
        });

        it("should render a p element", () => {
            const wrapper = mount(<StatusOption />);
            expect(wrapper.find("p").length).toEqual(1);
        });
    });
});
