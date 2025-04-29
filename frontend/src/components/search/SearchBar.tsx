import React from 'react';


interface SearchBarProps {
    width?: string;
    height?: string;
    fontSize?: string;
    padding?: string;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    width = "484px",
    height = "48px",
    fontSize = "16px",
    padding = "12px",
    placeholder = "Search token assets",
}) => {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                padding,
                border: "1px solid #3b82f6",
            }}
        >
            <svg
                style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                    color: "#9ca3af",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                placeholder={placeholder}
                style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    fontSize,
                    width: "100%",
                    outline: "none",
                }}
            />
        </div>
    );
};

export default SearchBar;