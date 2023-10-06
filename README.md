# Preface
Templates based on the monorepo architecture

# Use

#### Startup template

```
pnpm run demo
```

#### Package item
```
pnpm run build
```

#### Add plugin to main repository

```
pnpm add -Dw Plug-in name
```

#### Install specified dependencies separately for a package

pnpm provides the --filter parameter, which can be used to perform certain operations on specific packages.Therefore, if you want to install a dependent package for pkg1, such as axios, you can do the following:

```
pnpm add axios --filter Construction name
```

#### Interdependencies between modules

```
pnpm add component-pc   --filter demo
```
