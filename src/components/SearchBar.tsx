import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  placeholder: string | "Search";
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: FunctionComponent<Props> = (props: Props) => {
  const { placeholder, value, onChange } = props;

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "black" }} />
          </InputAdornment>
        }
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
