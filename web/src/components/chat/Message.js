import moment from "moment";

const Message = (props) => (
  <div
    style={
      props.message.outgoing
        ? {
            position: "relative",
            maxWidth: "75%",
            wordBreak: "break-word",
            padding: ".25rem",
            margin: ".25rem 1rem",
            boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075)",
            borderRadius: ".25rem",
            background: "#dcf8c6",
            alignSelf: "flex-start",
            textAlign: "right",
          }
        : {
            position: "relative",
            maxWidth: "75%",
            wordBreak: "break-word",
            padding: ".25rem",
            margin: ".25rem 1rem",
            boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075)",
            borderRadius: ".25rem",
            background: "#FFF",
            alignSelf: "flex-end",
            textAlign: "right",
          }
    }
  >
    <div className="d-flex flex-row">
      <div className="body m-1 mr-2" style={{ wordBreak: "break-word" }}>
        <pre
          style={{
            fontFamily: "Cairo, sans-serif",
            direction: "rtl",
            fontSize: "14px",
            overflow: "hidden",
            margin: 0,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {props.message.content}
        </pre>
        <span className="small text-muted">
          {moment(props.message.date).format("hh:mm a | MMM D")}
        </span>
      </div>
    </div>
  </div>
);

export default Message;
