export const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };

export const randomPage = () => {
    return Math.floor(Math.random() * 500).toString()
}
