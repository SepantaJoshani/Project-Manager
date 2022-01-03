export const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
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
    search,
  };
};

export const initialState = [
  createData(
    "Sepanta",
    "11/2/19",
    "website",
    "commerce",
    "N/A",
    "N/A",
    "N/A",
    "$15000",
    true
  ),
  createData(
    "Hatef",
    "10/17/19",
    "Custom Software",
    "GPS, Push Notifications, Users/Authentication, File Transfer",
    "Medium",
    "Web Application",
    "0-10",
    "$1600",
    true
  ),
  createData(
    "Nojan",
    "2/13/19",
    "Custom Software",
    "Photo/Video, File Transfer, Users/Authentication",
    "Low",
    "Web Application",
    "10-100",
    "$1250",
    true
  ),
  createData(
    "Ali",
    "2/13/19",
    "Mobile App",
    "Photo/Video, File Transfer, Users/Authentication",
    "Low",
    "iOS, Android",
    "10-100",
    "$1250",
    true
  ),
  createData(
    "Soheil",
    "2/13/19",
    "Mobile App",
    "Photo/Video, File Transfer, Users/Authentication",
    "Low",
    "Android",
    "10-100",
    "$1250",
    true
  ),
];

