import { MdOutlineAddBox, MdVisibility } from "react-icons/md";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Select from "./Select";
import TextInput from "./TextInput";


const DataTable = ({headers, items, filters, handleSearchOrFilter, handleFunction={}, tableTitle }) => {    
    const page = (filters.page < items.last_page ) ? filters.page : 1;
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    const [search, setSearch] = useState(filters.search || '');
    
    const options = [
        {value: 10, label: 10},
        {value: 25, label: 25},
        {value: 50, label: 50},
        {value: 100, label: 100},
    ];

    const handlePerPageChange = (value) => {
        setPerPage(value);

        handleOnSearchOrFilter(page, search, value);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        handleOnSearchOrFilter(page, value, perPage);
    };

    const handleOnSearchOrFilter = (_page, _search, _perPage) => {
        if (handleSearchOrFilter) {
            handleSearchOrFilter(_page, _search, _perPage);
        }
    };

    const executeFunction = (funcName, ...args) => {
        if (handleFunction[funcName]) {
            handleFunction[funcName](...args);
        } else {
            console.warn(`Function ${funcName} not found in handleFunction.`);
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        
                        {/* header Title */}

                        { tableTitle && (
                            <div className="bg-gray-100 px-4 py-4 text-xs text-gray-500 font-medium flex justify-between items-center border-b uppercase">
                                { tableTitle }
                            </div>
                        )}

                        {/* header */}
                        <div className="bg-gray-50 px-4 py-4 text-xs text-gray-500 font-medium flex justify-between items-center">
                            <div className="bg-gray-50 p-">
                                Show 
                                <Select
                                    value={perPage}
                                    options={options}
                                    className={"mx-2 px-2"}
                                    onChange={handlePerPageChange} />
                                entries
                            </div>

                            <TextInput
                                type="text"
                                value={search}
                                isFocused={true}
                                placeholder="Start typing here..." 
                                onChange={handleSearchChange}
                            />

                        </div>

                        {/* body */}
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    { headers && headers.map((header, index)=> (
                                        <th key={index} className="px-4 py-2 text-xs whitespace-no-wrap text-nowrap font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            
                                            {header.key === 'id' ? (
                                                <div className="flex items-center space-x-1">
                                                    {typeof handleFunction.onAdd === "function" && (
                                                        <MdOutlineAddBox 
                                                            className="text-2xl text-gray-600 cursor-pointer" 
                                                            title="Add"
                                                            onClick={() => executeFunction("onAdd")} />
                                                    )}

                                                </div>
                                            ) : (
                                                header.title
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {items && items.data.length > 0 ? (
                                    items.data.map((item, index) => (
                                        <tr key={index}>
                                            { headers && headers.map((header, index_)=> (
                                                <td key={index_} className="px-4 py-2 text-sm leading-5 whitespace-no-wrap border-b border-gray-200">
                                                    
                                                    {header.key === 'id' ? (
                                                        <div className="flex items-center space-x-1">
                                                            <MdVisibility 
                                                                className="text-2xl text-blue-500 cursor-pointer" 
                                                                title="View"
                                                                onClick={() => executeFunction("onView", item)} />
                                                        </div>
                                                    ) : (
                                                        item[header.key]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={headers ? headers.length : 1}
                                            className="px-4 py-2 text-sm text-center leading-5 whitespace-no-wrap border-b border-gray-200"
                                        >
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* footer  */}
                        <div className="bg-gray-50 px-4 py-4 text-xs text-gray-500 font-medium flex justify-between items-center">
                            <div className="">
                                Showing {items.from} to {items.to} of {items.total} entries
                            </div>
                            <div>
                                {items.links.map((link) => {
                                    // Ensure link.url is valid before proceeding
                                    if (!link.url) {
                                    return null; // If link.url is invalid, skip rendering this link
                                    }

                                    const queryParams = new URLSearchParams();

                                    // Include the search and per_page parameters in the query string
                                    if (search) {
                                    queryParams.append('search', search);
                                    }
                                    if (perPage) {
                                    queryParams.append('per_page', perPage);
                                    }

                                    // Handle appending the page number with proper concatenation
                                    let pageLink = link.url;
                                    const separator = pageLink.includes('?') ? '&' : '?';

                                    pageLink += separator + queryParams.toString(); // Add the query string to the link

                                    return link.url ? (
                                    <Link
                                        key={link.label}
                                        href={pageLink}  // If you're using React Router, use `to` instead of `href`
                                        className={`px-2 py-1 ${link.active ? 'text-blue-600 font-extrabold border' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                    ) : (
                                    <span
                                        key={link.label}
                                        className="px-2 py-1 text-slate-300"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataTable;