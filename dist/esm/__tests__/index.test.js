import { render, screen } from "@testing-library/react";
import React from "react";
import DocViewer from "../index";
import pdfFile from "../exampleFiles/pdf-file.pdf";
import pngFile from "../exampleFiles/png-image.png";
import epsFile from "../exampleFiles/eps-file.eps";
test("renders component with no documents", function () {
    render(React.createElement(DocViewer, { documents: [] }));
    expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});
test("renders component with documents", function () {
    var docs = [{ uri: pdfFile }, { uri: pngFile }];
    render(React.createElement(DocViewer, { documents: docs }));
    expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(screen.getByText("Document 1 of ".concat(docs.length))).toBeDefined();
});
test("renders component with unsupported file type", function () {
    var docs = [{ uri: epsFile, fileType: "application/postscript" }];
    render(React.createElement(DocViewer, { documents: docs }));
    expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(screen.getByText("No renderer for file type: application/postscript")).toBeInTheDocument();
});
test("renders doc viewer with initialActiveDocument prop", function () {
    var docs = [{ uri: pdfFile }, { uri: pngFile }];
    render(React.createElement(DocViewer, { documents: docs, initialActiveDocument: docs[1] }));
    var proxyRenderer = screen.getByTestId("proxy-renderer");
    expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(screen.getByText("Document 2 of ".concat(docs.length))).toBeDefined();
    expect(proxyRenderer).toBeDefined();
    expect(proxyRenderer.querySelector("img")).toBeDefined();
});
