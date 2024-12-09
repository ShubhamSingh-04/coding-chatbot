import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config()

const parseGitHubUrl = (url)=>{
    const githubRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;
  
    const match = url.match(githubRegex);
  
    if (match) {
      const [, owner, repo, ref, filePath] = match;
      return { owner, repo, filePath, ref };
    } else {
      throw new Error("Invalid GitHub file URL");
    }
  }


  const getGitInfo = async (owner, repo, filePath, ref) => {
    // Initialize Octokit with authentication
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN, // Replace with your GitHub token
    });
  
    try {
      // Fetch file content from the GitHub repository
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref, // Commit hash or branch name
      });
  
      // Decode the Base64-encoded content
      const fileContent = Buffer.from(data.content, "base64").toString("utf-8");
      console.log("File content:\n", fileContent);
    } catch (error) {
      console.error("Error fetching file content:", error.message);
    }
  };


  const attachGitHub = (url)=>{
    try {
      const { owner, repo, filePath, ref } = parseGitHubUrl(url);
      console.log("Owner:", owner);
      console.log("Repo:", repo);
      console.log("File Path:", filePath);
      console.log("Ref:", ref);
  
      getGitInfo(owner, repo, filePath, ref);
      
    } catch (error) {
      console.error(error.message);
    }
  }


  
  const url = "https://github.com/Victor-Ikechukwu/Python/blob/64b75379d718ff10140bb4ee7a4e15fd2731bea7/app.py";
  
export default attachGitHub;
  