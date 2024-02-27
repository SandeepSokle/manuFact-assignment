import wine_data_set from "./wine_data_set";

export default function fetch_my_table({ table_name }) {
  // group by alcohol and added Gamma Data from here with each
  const grouped_data = group_wind_data();

  // all keys in order, by this order for the data will maintain for next mean, median, mode
  let all_keys = Object.keys(grouped_data);

  //mean
  let mean_data_each_group = all_keys.map((ele) => {
    let total = grouped_data[ele]
      ? find_total_of_key(grouped_data[ele], table_name)
      : 0;
    return { class: ele, ...total };
  });

  // Median
  const median_data_each_group = all_keys.map((ele) => {
    let sorted_data = grouped_data[ele]
      ? get_sorted_data(grouped_data[ele], table_name)
      : 0;
    return { class: ele, sorted_data, total: sorted_data.length };
  });

  // mode
  const mode_data_each_group = all_keys.map((ele) => {
    let mode = grouped_data[ele] ? get_mode(grouped_data[ele], table_name) : 0;
    return { class: ele, mode };
  });

  // make Final Result
  const result = {
    classes: all_keys,
    mean: mean_data_each_group.map((ele) =>
      parseFloat(ele.total_sum / ele.total_elements).toFixed(3)
    ),
    median: median_data_each_group.map((ele) => {
      if (ele.total % 2 == 0) {
        let mid = ele.total / 2;
        let first = parseFloat(ele.sorted_data[mid][`${table_name}`]);
        let last = parseFloat(ele.sorted_data[mid + 1][`${table_name}`]);
        let median = parseFloat(first + last).toFixed(3);
        return median;
      }
      return ele.sorted_data[(ele.total - 1) / 2][`${table_name}`];
    }),
    mode: mode_data_each_group.map((ele) => ele.mode),
  };
  return result;
}

const group_wind_data = () => {
  const groupedByAlcohol = {};
  // Group the data by Alcohol value and add gamma
  wine_data_set.forEach((entry) => {
    const alcoholValue = entry.Alcohol;
    if (!groupedByAlcohol[alcoholValue]) {
      groupedByAlcohol[alcoholValue] = [];
    }
    const myObj = {
      ...entry,
      Gamma: (
        (parseFloat("" + entry.Ash) * parseFloat("" + entry.Hue)) /
        parseFloat("" + entry.Magnesium)
      ).toFixed(3),
    };
    groupedByAlcohol[alcoholValue].push(myObj);
  });
  return groupedByAlcohol;
};

const find_total_of_key = (array, table_name) => {
  let total = array.reduce(
    (ans, ele) => {
      if (isNaN(ele[`${table_name}`])) return ans;
      return {
        total_sum: ans.total_sum + parseFloat(ele[`${table_name}`]),
        total_elements: ans.total_elements + 1,
      };
    },
    { total_sum: 0, total_elements: 0 }
  );
  return total;
};

const get_sorted_data = (array, table_name) => {
  let sorted_data = array.sort((a, b) => {
    return a[`${table_name}`] - b[`${table_name}`];
  });
  return sorted_data;
};

const get_mode = (array, table_name) => {
  const counts = {};
  let maxCount = 0;
  let mode = null;

  for (const ele of array) {
    counts[ele[table_name]] = (counts[ele[table_name]] || 0) + 1;
    if (counts[ele[table_name]] > maxCount) {
      maxCount = counts[ele[table_name]];
      mode = ele[table_name];
    }
  }
  return mode;
};
