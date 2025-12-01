export default function Summary({ likedCats, restart }) {
  return (
    <div className="summary">
      {/* Tajuk summary */}
      <h1>Paw Preferences</h1>
      <h2>You liked {likedCats.length} cats!</h2>
      <div className="liked-cats">
        {likedCats.map((cat, i) => (
          <img key={i} src={cat} alt="liked cat" />
        ))}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
