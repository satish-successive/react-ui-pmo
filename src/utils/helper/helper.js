import React, { useMemo } from "react";

const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;


export { containsText };
