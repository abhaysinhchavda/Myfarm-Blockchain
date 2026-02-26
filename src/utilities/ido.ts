import axios from 'axios';
import { Project } from '../store/ido/reducer';

export const getProjects = async (
  chainId: number,
  account: string
): Promise<Project[]> => {
  try {
    const result: any = await axios.get(
      `https://api.launch.unifarm.co/v1/launch/projects?chainId=${chainId}&account=${account}`
    );
    return result.data.data as Project[];
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return;
    }
  }
};
