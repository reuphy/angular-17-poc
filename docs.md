* [Project Description](#project-description-by-file)
* [Search](#searching)
* [Manual table refresh](#manual-table-refresh)
* [Table sorting](#table-sorting)
* [Table loading](#table-loading)
* [Roles](#roles)
* [Quicktype link](#quicktype)
## Project description by file

* environments: Contains configuration variables for different deployment targets
* assets
    * i18n: Internationalization files (well, mostly translations)
    * images: Image assets used by the app
* app: Source of the webapp
    * interfaces
    * services
        * server.service.ts: Server interaction service
            * GET, POST, PUT, PATCH, DELETE
            * The special "postAndReceiveText" is required to work around an issue in Angular's HTTP client which errors out if the received data is not JSON
            * The special "patchAndSendText" is required to indicate to the server that we're sending JSON and want to receive JSON 
        * auth.service.ts
            * Logs the user in and out
            * Holds a reference to the current user
            * Stores the received token in the cookies
        * auth.interceptor.ts
            * Automatically injects the authenticated header into any requests
            * Disconnects the user if the server tells us that we are not logged in, or that the token has expired.
        * auth.guard.ts
            * Route guard requiring being authentified
        * role.guard.ts
            * Route guard requiring the logged in user to have a specific role
        * All other service files
            * Basic server interaction in 90% of cases
            * Two special functions: get/search
                * These are specialized functions to fetch table data
                * SortConfig specifies which column sets the sort order, and in which order
                * SearchConfig specifies the list of applied filters to the query
    * components
        * components.module.ts: Contains the routes and the module declaration
        * shared: Files that don't fit in a specific folder
            * supported-languages.ts: constants containing country codes for supported languages
        * page-not-found: default route if the user attempts to reach a non-existent route
        * index
            * Root page of this module
            * Contains the navigation bar as well as a router
            * Contains a search box, which is a quick-access to folders by ID
            * Contains a dropdown letting users select their language
            * Contains a user detail button, letting users edit themselves or disconnect
        * login: Login page
        * administration: Pages accessible in the NavBar under the "Administration" heading
            * events-list (component)
                * Contains a standalone list of user activity events on folders and files
                * Can be filtered through using a search section
                * Can be sorted based a column
                * Clicking on a user shows a profile card containing more information about them
                * If a file is imported, the file can be downloaded in the events list
            * user-list (component)
                * Contains a standalone list of all users recognized by the system
                * Can be filtered through using a search section
                * Can be sorted based a column
                * Users can be edited
                * A new user can be created
            * user-form (component)
                * The form used in user-list to either edit or create a new user
        * dossiers: Pages accessible in the NavBar under the "Dossier" heading
            * fichier-list (component)
                * Contains a standalone list of files
                * Can be filtered through using a search section
                * Can be sorted based a column
                * Clicking on the folder ID redirects to it's details page
                * The file can be downloaded
            * dossier-list (component)
                * The default route
                * Contains a standalone list of folders
                * Can be filtered through using a search section
                * Can be sorted based a column
                * Clicking on the folder ID redirects to it's details page
                * Clicking on a user shows a profile card containing more information about them
            * dossier-details (component)
                * Master page of all folder details, holds the other components used to subdivide the dossier details
                * Allows users to download the project as a CSV file
                * Below are the sub-components of this component, they are ordered as they are shown on the page
            * dossier-to-treat (component)
                * change the status of a file (closed, waiting) when a button is clicked
                it automatically refresh the dossier-history component
            * dossier-fiche-signaletique (component)
                * shows informations about the files
                * Changing "Autorité compétente" updates the data serverside
            * dossier-comments (component)
                * crud to add a list of comments
                * only admin can edit
                * user can create, delete, update
            * dossier-composition-project (component)
                * show an overview of the project building
                * download the project
            * dossier-documents-joints (component)
                * upload one or multipe files to the project
                * download and delete the file
                * shows modal details when click on a user
            * dossier-command-list (component)
                * accepts or refuse provided documents
                * allows to see file history
                * allows to download the latest, or historical revisions of the document
                * shows modal details when click on a user
            * dossier-history (component)
                * shows events-list, but only for this particular folder
            * dossier-folder-not-found
                * Shown when the page is reached with an invalid folder ID

## Searching

When searching, the common pattern is to use functions similar to these:

```ts
  asLikeFilter(field: string, value: string): Filter {
    return {
      field: field,
      operator: "LIKE",
      value: value,
    };
  }

  search() {
    const filters = [];

    if (this.refDossier != "") {
      filters.push(this.asLikeFilter("dossier.administrativeReference", this.refDossier));
    }

    if (this.user != "") {
      filters.push(this.asLikeFilter("user.userName", this.user));
    }

    if (this.fileNameOnServer != "") {
      filters.push(this.asLikeFilter("serverFileName", this.fileNameOnServer));
    }

    if (this.userNameFile != "") {
      filters.push(this.asLikeFilter("userFileName", this.userNameFile));
    }

    this.filter = {
      filters: filters,
      combineOperator: this.criteria == "all" ? "AND" : "OR"
    }

    this.onLazyLoad(this.table.createLazyLoadMetadata());
  }
```

The `as?Filter` is used to convert search terms into appropriate filters for the current search criteria, you don't need to create the helper, but it is convenient for long lists of criteria.

This is not always `LIKE`, but it can also be others, such as
```java
public enum FilterOperator {
    GREATER_THAN,
    GREATER_THAN_EQUALS,
    LESS_THAN,
    LESS_THAN_EQUALS,
    EQUALS,
    LIKE,
    NOT_EQUALS,
    IN,
    NULL,
    NOT_NULL;
```

And not all operations are allowed for all search filters.

You can find the filters in `backend/service/src/main/java/com/capgemini/bddpeb2/filtering/FilterOperator.java`, and the allowed filters per term are in the Java source too.

Note: the following are for indicative reference only, and may have been updated since then.

Here is User's, at `backend/service/src/main/java/com/capgemini/bddpeb2/UserService.java`
```java
        Map<String, List<FilterOperator>> map = new HashMap<>();
        map.put("userName",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("firstName",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("lastName",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("role",Arrays.asList(EQUALS, NOT_EQUALS, IN));
        map.put("email",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("phone",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("language",Arrays.asList(EQUALS, NOT_EQUALS, IN));
        map.put("userStatus",Arrays.asList(EQUALS, NOT_EQUALS, IN));
        map.put("infoMessageType",Arrays.asList(EQUALS, NOT_EQUALS, IN));
        map.put("numberOfAgrement",Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
```

And here is Dossier's, at `backend/service/src/main/java/com/capgemini/bddpeb2/DossierService.java`
```java
        Map<String, List<FilterOperator>> map = new HashMap<>();
        map.put("administrativeReference", Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        map.put("statusType", Arrays.asList(EQUALS, NOT_EQUALS, LIKE, IN, NULL, NOT_NULL));
        return map;
```

## Manual table refresh
To force-trigger a reload of a Lazy-Loaded table, you need to call the refreshing function, but it will require a `LazyLoadEvent`.

To do so, you can call `createLazyLoadMetadata()` on the table child component, to get a reference to it, do as such

```ts
export class SomeComponent{
    ...
    @ViewChild(Table, { static: true }) table: Table;
    ...

    void someFunctionThatNeedsToUpdateTheList() {
        ...
        this.onLazyLoad(this.table.createLazyLoadMetadata());
    }

    void onLazyLoad(event: LazyLoadEvent) {...}
```

## Table sorting

The table sorting system is mostly done by ng-prime, and then packaged into a SortConfig to be dispatched to the server.

[Link to the Prime documentation about table sorting](https://primeng.org/table#sort)

## Table loading

Prime gives us the first element in the row, as well as the amount of rows, but not the page number.

To compute it, we need to do `first / rows`

Since these can be nullable, don't forget the null coalescing operator, `??`

Here is an example of the final query done to the server:


without search
```ts
    const res = await this.userService.get(
      Math.floor((event.first ?? 0) / (event.rows ?? 1)),
      event.rows ?? 1,
      {
        field: event.sortField,
        order: event.sortOrder as -1 | 0 | 1,
      },
    );
```

With search
```ts
    const res = await this.userService.search(
      Math.floor((event.first ?? 0) / (event.rows ?? 1)),
      event.rows ?? 1,
      {
        field: event.sortField,
        order: event.sortOrder as -1 | 0 | 1,
      },
      this.filter,
    );
```

Do note, a `get` is the same as a `search` with an empty filter.

## Roles
To hide or show an html content u can use the *appHasRole directive. The code goes as follow :

```html
    <!-- example with an array means exact roles  -->
  <div *appHasRole="[role.RESPONSABLE_WEBPEB,role.ARCHITECT]"></div>
    <!-- example with just a single value means all the role starting form architect untill Administrator  -->
  <div *appHasRole="role.ARCHITECT"></div>
```

To protect access routing, you can go to the components.module.ts and after the path propertie add the following code :

```ts
//  example with an array means exact roles
        path: 'dossier/fichier-list', component: FichierListComponent, canActivate: [AuthGuard, RoleGuardService],
        data: {
          role: [role.RESPONSABLE_WEBPEB,role.ARCHITECT]
        }
//  example with just a single value means all the role starting form architect untill Administrator
        path: 'dossier/fichier-list', component: FichierListComponent, canActivate: [AuthGuard, RoleGuardService],
        data: {
          role: Role.ARCHITECT
        }
```
## Quicktype

Quicktype.io generates code from JSON data, making it easier and faster for developers to handle structured data in various programming languages.

link : [https://quicktype.io/](https://quicktype.io/)



