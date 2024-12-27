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
      // console.log("github.service:", data)
  
      // Decode the Base64-encoded content
      const fileContent = Buffer.from(data.content, "base64").toString("utf-8");
      return({owner, repo, fileContent});

    } catch (error) {
      console.error("Error fetching file content:", error.message);
    }
  };


  const attachGitHub = async(url)=>{
    try {
      // console.log("In git hub service file");
      const { owner, repo, filePath, ref } = parseGitHubUrl(url);
  
      return await getGitInfo(owner, repo, filePath, ref);
      
    } catch (error) {
        throw new Error(error);
    }
  }

export {attachGitHub} ;
  