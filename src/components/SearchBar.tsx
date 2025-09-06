import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  placeholder: string | "Search";
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: FunctionComponent<Props> = (props: Props) => {
  const { placeholder, value, onChange } = props;
  const theme = useTheme();

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.text.primary }} />
          </InputAdornment>
        }
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
