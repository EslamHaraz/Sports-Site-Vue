import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import signUpView from "../views/signUpView.vue";
import loginView from "../views/loginView.vue";
import TagsView from "../views/TagsView.vue";
import SectionsView from "../views/SectionsView.vue";
import contactUsView from "../views/contactUsView.vue";
import whoweAreView from "../views/whoweAreView.vue";
import articleView from "../views/articleView.vue";
import privacyView from "../views/privacyView.vue";
import profileView from "../views/profileView.vue";
import adminLogin from "../views/adminLogin.vue";
import dashboardView from "../views/dashboardViews/dashboardView.vue";
import adminProfileView from "../views/dashboardViews/adminProfileView.vue";
import postingView from "@/views/dashboardViews/postingView.vue";
import addPost from "@/components/Dashboard/addPost.vue";
import editPost from "@/components/Dashboard/editPost.vue";
import pagesView from "@/views/dashboardViews/pagesView.vue";
import editPage from "@/components/Dashboard/editPage.vue";
import adminsView from "@/views/dashboardViews/adminsView.vue";
import addAdmin from "@/components/Dashboard/addAdmin.vue";
import editAdmin from "@/components/Dashboard/editAdmin.vue";
import usersView from "@/views/dashboardViews/usersView.vue";
import tagsView from "@/views/dashboardViews/tagsView.vue";
import editTag from "@/components/Dashboard/editTag.vue";
import addTag from "@/components/Dashboard/addTag.vue";
import sectionsView from "@/views/dashboardViews/sectionsView.vue";
import settingView from "@/views/dashboardViews/settingView.vue";
import editSection from "@/components/Dashboard/editSection.vue";
import addSection from "@/components/Dashboard/addSection.vue";
import commentsView from "@/views/dashboardViews/commentsView.vue";
import messagesView from "@/views/dashboardViews/messagesView.vue";
import reportingView from "@/views/dashboardViews/reportingView.vue";
import sectionArticles from "@/components/sectionArticles/sectionArticles.vue";
import tagArticles from "@/components/tagArticles/tagArticles.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signUp",
    name: "signUpView",
    component: signUpView,
  },
  {
    path: "/login",
    name: "loginView",
    component: loginView,
  },
  {
    path: "/Tags",
    name: "TagsView",
    component: TagsView,
  },
  {
    path: "/Sections",
    name: "SectionsView",
    component: SectionsView,
  },
  {
    path: "/sectionArticles/:sectionId",
    name: "sectionArticles",
    component: sectionArticles,
  },
  {
    path: "/tagArticles/:tagId",
    name: "tagArticles",
    component: tagArticles,
  },
  {
    path: "/contactUs",
    name: "contactUsView",
    component: contactUsView,
  },
  {
    path: "/whoweAre",
    name: "whoweAreView",
    component: whoweAreView,
  },
  {
    path: "/article/:postId/section/:sectionId",
    name: "articleView",
    component: articleView,
  },
  {
    path: "/privacy",
    name: "privacyView",
    component: privacyView,
  },
  {
    path: "/profile",
    name: "profileView",
    component: profileView,
  },
  {
    path: "/admin/login",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/dashboard",
    name: "dashboardView",
    component: dashboardView,
  },
  {
    path: "/posting",
    name: "postingView",
    component: postingView,
  },
  {
    path: "/posting/addPost",
    name: "addPost",
    component: addPost,
  },
  {
    path: "/posting/editPost/:postId",
    name: "editPost",
    component: editPost,
  },
  {
    path: "/pages",
    name: "pagesView",
    component: pagesView,
  },
  {
    path: "/editPage/:pageId",
    name: "editPage",
    component: editPage,
  },
  {
    path: "/admins",
    name: "adminsView",
    component: adminsView,
  },
  {
    path: "/addAdmin",
    name: "addAdmin",
    component: addAdmin,
  },
  {
    path: "/editAdmin/:adminId",
    name: "editAdmin",
    component: editAdmin,
  },
  {
    path: "/users",
    name: "usersView",
    component: usersView,
  },
  {
    path: "/tagsDashboard",
    name: "tagsView",
    component: tagsView,
  },
  {
    path: "/addTag",
    name: "addTag",
    component: addTag,
  },
  {
    path: "/editTag/tagId:tagId",
    name: "editTag",
    component: editTag,
  },
  {
    path: "/sectionsDashboard",
    name: "sectionsView",
    component: sectionsView,
  },
  {
    path: "/addSection",
    name: "addSection",
    component: addSection,
  },
  {
    path: "/editSection/:sectionId",
    name: "editSection",
    component: editSection,
  },
  {
    path: "/comments",
    name: "commentsView",
    component: commentsView,
  },
  {
    path: "/messages",
    name: "messagesView",
    component: messagesView,
  },
  {
    path: "/reporting",
    name: "reportingView",
    component: reportingView,
  },
  {
    path: "/adminProfile",
    name: "adminProfileView",
    component: adminProfileView,
  },
  {
    path: "/setting",
    name: "settingView",
    component: settingView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
