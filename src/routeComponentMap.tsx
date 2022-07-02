import { createStackNavigator } from "@react-navigation/stack";
import RouteNames from "./routeNames";
import ArticleDetail from "./screens/ArticleDetail";
import Home from "./screens/Home";

const router = {
  [RouteNames.Rss.Home]: Home,
  [RouteNames.Rss.ArticleDetail]: ArticleDetail,
};

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator
    initialRouteName={RouteNames.Rss.Home}
    screenOptions={{ headerShown: false }}
  >
    {Object.keys(router).map((item) => (
      <Stack.Screen key={item} name={item} component={router[item]} />
    ))}
  </Stack.Navigator>
);

export default AppStack;
