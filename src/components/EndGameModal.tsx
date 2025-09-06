"use client";

interface EndGameModalProps {
  score: number;
}
export default function EndGameModal(props: EndGameModalProps) {
  return (
    <dialog id="myModal">
      <h2>Modal Title</h2>
      <p>This is the content of the modal.</p>
      <p>{props.score}</p>
      <button id="closeModal">Close</button>
    </dialog>
  );
}
