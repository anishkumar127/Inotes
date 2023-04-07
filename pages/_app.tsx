import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/theme.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SearchContext } from "@/context/context";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [themeColor, setThemeColor] = useState("bg-light");

  // COMMON CSS CLASS_NAME
  // LESS CSS CLASS_NAME
  const inputGroupText = `${theme ? "" : "bg-secondary"}`;
  const inputGroupPlaceholder = `${theme ? "" : "placeholder-color"}`;

  //   SEARCH
  const onSearch = (e: any) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <SearchContext.Provider
      value={{
        onSearch,
        searchText,
        themeColor,
        setThemeColor,
        theme,
        setTheme,
        inputGroupText,
        inputGroupPlaceholder,
      }}
    >
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SearchContext.Provider>
  );
}
