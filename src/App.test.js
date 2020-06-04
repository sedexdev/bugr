import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import App from "./App";

describe("App component", () => {
    test("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Renders correctly", () => {
        const tree = renderer.create(<App />);
        expect(tree).toMatchSnapshot();
    });
});
