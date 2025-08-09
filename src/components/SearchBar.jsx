import s from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(e){ e.preventDefault(); onSubmit?.(); }
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        className={s.input}
        type="text"
        placeholder="Busque um filme..."
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
      <button className={s.btn} type="submit">Buscar</button>
    </form>
  );
}
