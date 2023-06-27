function replaceStringVariables(
    fullString: string,
    data: { [x: string]: string }
  ) {
    const regex = /^#.*|\${(\w+)}/gm;
    const missingFields: string[] = [];
    const replacedString = fullString.replace(regex, (match, key) => {
      if (match.startsWith('#')) {
        return match;
      }
      if (!data[key]?.length) {
        missingFields.push(match.substring(1));
      }
      return `"${data[key]}"`;
    });
    if (missingFields.length) {
      console.log(
        `\nFollowing environment variables in the template file
        does not contain values from remote source.
        Remove them from env file or provide value in the
        Hashicorp vault.\n
        ${missingFields.join("\n")}`
      );
      throw new Error("internal::INVALID_TEMPLATE_OR_SECRETS");
    } else {
      return replacedString;
    }
  }
  