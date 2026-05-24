import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;

// //    I -->     {Object.keys(filterOptions).map((keyItem) => (
// //           This loops through all keys of filterOptions.

// // For example, if filterOptions is like:

// // {
// //   category: [...],
// //   brand: [...],
// //   price: [...]
// // }

// // then keyItem will become:

// // "category"
// // "brand"
// // "price"

// // II-->  <Fragment key={keyItem}>

// // Each filter group is wrapped in a Fragment.

// // The key={keyItem} is necessary because you are rendering a list.

// // III -->  {filterOptions[keyItem].map((option) => (

// // This loops through each option inside the current filter group.

// // Example: if keyItem is "brand", then it maps over all brand options.

// // <Label
// //   key={option.id}
// //   className="flex font-medium items-center gap-2 "
// // >

// // IV --> where dose filte comes in this
// //  <Checkbox
// //                       checked={
// //                         filters &&
// //                         Object.keys(filters).length > 0 &&
// //                         filters[keyItem] &&
// //                         filters[keyItem].indexOf(option.id) > -1
// //                       }
// //                       onCheckedChange={() => handleFilter(keyItem, option.id)}
// //                     />
// //                     {option.label}
// //                   </Label>

// // Example Parent Component

// // Here is a simple example so you understand clearly.

// // function ShoppingPage() {
// //   const [filters, setFilters] = useState({
// //     category: ["mobile"],
// //     brand: ["apple"],
// //   });

// //   function handleFilter(categoryKey, optionId) {
// //     console.log(categoryKey, optionId);
// //   }

// //   return (
// //     <ProductFilter
// //       filters={filters}
// //       handleFilter={handleFilter}
// //     />
// //   );
// // }
// // Then inside ProductFilter

// // The filters object becomes:

// // {
// //   category: ["mobile"],
// //   brand: ["apple"]
// // }
// // Now understand this part
// // filters[keyItem]

// // Suppose:

// // keyItem = "brand"

// // then:

// // filters[keyItem]

// // becomes:

// // filters["brand"]

// // which returns:

// // ["apple"]
// // Then this line
// // filters[keyItem].indexOf(option.id) > -1

// // checks whether the current option exists in the selected filters.

// // Example:

// // option.id = "apple"

// // then:

// // ["apple"].indexOf("apple")

// // returns:

// // 0

// // Since:

// // 0 > -1

// // is true, checkbox becomes checked.
