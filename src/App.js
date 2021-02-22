import React from "react";
import marked from "marked";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import $ from "jquery";

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + "</a>";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: placeholder,
      currentPos: "",
      editorMaximized: false,
      previewMaximized: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickBold = this.handleClickBold.bind(this);
    this.handleClickArea = this.handleClickArea.bind(this);
    this.handleClickItalic = this.handleClickItalic.bind(this);
    this.handleClickLink = this.handleClickLink.bind(this);
    this.handleClickInlineCode = this.handleClickInlineCode.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleClickUnorderedList = this.handleClickUnorderedList.bind(this);
    this.handleClickOrderedList = this.handleClickOrderedList.bind(this);
    this.handleClickEditor = this.handleClickEditor.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  getMarkdownText() {
    var rawMarkup = marked(this.state.value, {
      breaks: true,
      renderer: renderer,
    });
    return { __html: rawMarkup };
  }
  handleChange(event) {
    let index = event.target.selectionStart;
    this.setState({ value: event.target.value, currentPos: index });
  }
  handleClickArea(event) {
    let index = event.target.selectionStart;
    this.setState({ currentPos: index });
  }
  handleClickEditor() {
    $(".previewWrapper").toggleClass("hiddenClass");
    $(".editorWrapper").toggleClass("maximizedClassEditor");
    $(".editor").toggleClass("editorForToggle");
    $(".designBy").toggleClass("hiddenClass");

    $(".important").toggleClass("fa-expand fa-compress");
    var title = $(".important").prop("title");
    if (title === "Maximize") {
      $(".important").attr("title", "Minimize");
    } else {
      $(".important").attr("title", "Maximize");
    }
  }
  handleClickPreview() {
    $(".editorWrapper").toggleClass("hiddenClass");
    $(".previewWrapper").toggleClass("maximizedClassPreview");
    $(".important").toggleClass("fa-expand fa-compress");
    $(".designBy").toggleClass("hiddenClass");
    var title = $(".important").prop("title");
    if (title === "Maximize") {
      $(".important").attr("title", "Minimize");
    } else {
      $(".important").attr("title", "Maximize");
    }
  }

  handleClickBold(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        "**StrongText**" +
        this.state.value.slice(this.state.currentPos),
    });
  }

  handleClickItalic(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `_EmphasizedText_` +
        this.state.value.slice(this.state.currentPos),
    });
  }
  handleClickLink(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `[Link](https://)` +
        this.state.value.slice(this.state.currentPos),
    });
  }
  handleClickInlineCode(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `\`Inline Code\`` +
        this.state.value.slice(this.state.currentPos),
    });
  }
  handleClickImage(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `![Alt Text](https://)` +
        this.state.value.slice(this.state.currentPos),
    });
  }
  handleClickUnorderedList(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `- List Item` +
        this.state.value.slice(this.state.currentPos),
    });
  }
  handleClickOrderedList(event) {
    event.preventDefault();
    this.setState({
      value:
        this.state.value.slice(0, this.state.currentPos) +
        `1. List Item` +
        this.state.value.slice(this.state.currentPos),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // ! For update so when changed text to select the appropriate value
    if (this.state.value !== prevState.value) {
      $("textarea")[0].focus({ preventScroll: true });
      const nerval = prevState.value.slice(prevState.currentPos).length;
      const shmear = this.state.value.length;
      // eslint-disable-next-line
      this.state.currentPos = shmear - nerval; // I know this is not right, but it solves my problem at hand.
      if (this.state.currentPos === "") {
        this.setState({ currentPos: 0 });
      }
      if (this.state.currentPos >= 14) {
        if (
          this.state.value.slice(
            this.state.currentPos - 14,
            this.state.currentPos
          ) === "**StrongText**"
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 12,
            this.state.currentPos - 2
          );
        }
      }
      if (this.state.currentPos >= 16) {
        if (
          this.state.value.slice(
            this.state.currentPos - 16,
            this.state.currentPos
          ) === "_EmphasizedText_"
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 15,
            this.state.currentPos - 1
          );
        }
        if (
          this.state.value.slice(
            this.state.currentPos - 16,
            this.state.currentPos
          ) === `[Link](https://)`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 13) {
        if (
          this.state.value.slice(
            this.state.currentPos - 13,
            this.state.currentPos
          ) === `\`Inline Code\``
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 12,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 21) {
        if (
          this.state.value.slice(
            this.state.currentPos - 21,
            this.state.currentPos
          ) === `![Alt Text](https://)`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 11) {
        if (
          this.state.value.slice(
            this.state.currentPos - 11,
            this.state.currentPos
          ) === `- List Item`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos
          );
        }
      }
      if (this.state.currentPos >= 12) {
        if (
          this.state.value.slice(
            this.state.currentPos - 12,
            this.state.currentPos
          ) === `1. List Item`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos
          );
        }
      }
    }

    // ! For update so when clicked to select the appropriate value
    if (this.state.value !== prevProps.value) {
      if (this.state.currentPos >= 14) {
        if (
          this.state.value.slice(
            this.state.currentPos - 14,
            this.state.currentPos
          ) === "**StrongText**"
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 12,
            this.state.currentPos - 2
          );
        }
      }
      if (this.state.currentPos >= 16) {
        if (
          this.state.value.slice(
            this.state.currentPos - 16,
            this.state.currentPos
          ) === "_EmphasizedText_"
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 15,
            this.state.currentPos - 1
          );
        }
        if (
          this.state.value.slice(
            this.state.currentPos - 16,
            this.state.currentPos
          ) === `[Link](https://)`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 13) {
        if (
          this.state.value.slice(
            this.state.currentPos - 13,
            this.state.currentPos
          ) === `\`Inline Code\``
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 12,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 21) {
        if (
          this.state.value.slice(
            this.state.currentPos - 21,
            this.state.currentPos
          ) === `![Alt Text](https://)`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos - 1
          );
        }
      }
      if (this.state.currentPos >= 11) {
        if (
          this.state.value.slice(
            this.state.currentPos - 11,
            this.state.currentPos
          ) === `- List Item`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos
          );
        }
      }
      if (this.state.currentPos >= 12) {
        if (
          this.state.value.slice(
            this.state.currentPos - 12,
            this.state.currentPos
          ) === `1. List Item`
        ) {
          $("textarea")[0].setSelectionRange(
            this.state.currentPos - 9,
            this.state.currentPos
          );
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h1 className="designBy">
          Designed by{" "}
          <a
            href="https://www.linkedin.com/in/davor-jovanovi%C4%87/"
            rel="noreferrer"
            target="_blank"
          >
            DavorJ
          </a>
        </h1>
        <div className="editorWrapper">
          <div className="toolbar">
            <i class="fa fa-edit" aria-hidden="true"></i>{" "}
            <p className="TextInsideToolbar">Editor</p>
            <i
              className="fa fa-bold faForChanges"
              title="Bold"
              aria-hidden="true"
              onClick={this.handleClickBold}
            ></i>
            <i
              className="fa fa-italic faForChanges"
              title="Italic"
              aria-hidden="true"
              onClick={this.handleClickItalic}
            ></i>
            <i
              className="fa fa-link faForChanges"
              title="Link"
              aria-hidden="true"
              onClick={this.handleClickLink}
            ></i>
            <i
              className="fa fa-code faForChanges"
              title="Inline code"
              aria-hidden="true"
              onClick={this.handleClickInlineCode}
            ></i>
            <i
              className="fa fa-image faForChanges"
              title="Image"
              aria-hidden="true"
              onClick={this.handleClickImage}
            ></i>
            <i
              className="fa fa-list-ul faForChanges"
              title="Bulleted List"
              aria-hidden="true"
              onClick={this.handleClickUnorderedList}
            ></i>
            <i
              className="fa fa-list-ol faForChanges"
              title="Numbered List"
              aria-hidden="true"
              onClick={this.handleClickOrderedList}
            ></i>
            <i
              className="fa fa-expand faForChanges important"
              idName="editorMaximizeMinimize"
              title="Maximize"
              aria-hidden="true"
              onClick={this.handleClickEditor}
            ></i>
          </div>
          <textarea
            idName="editor"
            className="editor"
            ref="myTextarea"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={this.handleClickArea}
          />
        </div>
        <div className="previewWrapper">
          <div className="toolbarPreview">
            <i class="fa fa-eye" aria-hidden="true"></i>{" "}
            <p className="PreviewText">Previewer</p>
            <i
              className="fa fa-expand faForChanges important"
              idName="previewerMaximizeMinimize"
              title="Maximize"
              aria-hidden="true"
              onClick={this.handleClickPreview}
            ></i>
          </div>
          <div
            idName="preview"
            className="preview"
            dangerouslySetInnerHTML={this.getMarkdownText()}
          ></div>
        </div>
        ;
      </div>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backtick.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://miro.medium.com/max/512/1*kXUV23TqjRruaiRs-8wLRQ.png) ![jQuery Logo w/ Text](https://cdn.iconscout.com/icon/free/png-256/jquery-8-1175153.png) ![Javascript Logo w/ Text](https://www.easyprogramming.net/logo/js.png) ![HTML5 Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/600px-HTML5_Badge.svg.png) ![CSS3 Logo w/ Text](https://www.pngkey.com/png/full/347-3470911_css3-html-css-js-logo-white.png)`;

export default App;
