import Input from "@mui/joy/Input";

function HeaderSearch({ onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <>
      <Input
        variant="outlined"
        type="text"
        size="md"
        style={{ width: "300px" }}
        placeholder="Type in here…"
        onChange={handleSearchChange}
      />
    </>
  );
}

export default HeaderSearch;
