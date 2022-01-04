import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getPost = () => {
  const directoryPath = path.join(process.cwd(), "content/posts");
  const pageSlugs = fs.readdirSync(directoryPath);
  const posts = pageSlugs.map((filename) => {
    const slugWspace = filename.replace(".md", "");
    const slug = slugWspace.replace(/ /g, "-");

    const fullPath = path.join(directoryPath, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    const category = frontmatter.category.replace(/ /g, "-");

    return {
      slug,
      content,
      frontmatter,
      category,
    };
  });

  return posts;
};

export const getAboutData = () => {
  const aboutFile = fs.readdirSync(path.join(process.cwd(), "content/about"));
  const metaDataWithFrontMatter = fs.readFileSync(
    path.join("content/about", aboutFile[0]),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(metaDataWithFrontMatter);

  return {
    frontmatter,
    content,
  };
};

export const getDefaultPage = () => {
  const DefaultFile = fs.readdirSync(
    path.join(process.cwd(), "content/default")
  );
  const defaultPAge = DefaultFile.map((filename) => {
    const slugWspace = filename.replace(".md", "");
    const slug = slugWspace.replace(/ /g, "-").toString();
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/default", filename),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);
    const paths = frontmatter.path;
    return {
      frontmatter,
      content,
      slug,
      paths,
    };
  });

  return defaultPAge;
};