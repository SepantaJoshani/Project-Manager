export const createData = (
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total
  ) => {
    return {
      name,
      date,
      service,
      features,
      complexity,
      platforms,
      users,
      total,
    };
  };

  export const initialState =[
    createData(
      "Sepanta",
      "11/2/19",
      "website",
      "commerce",
      "N/A",
      "N/A",
      "N/A",
      "$15000"
    ),
    createData(
      "Bill Gates",
      "10/17/19",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600"
    ),
    createData(
      "Steve Jobs",
      "2/13/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250"
    ),
    createData(
      "Stan Smith",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS, Android",
      "10-100",
      "$1250"
    ),
    createData(
      "Albert Einstein",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250"
    ),
  ]