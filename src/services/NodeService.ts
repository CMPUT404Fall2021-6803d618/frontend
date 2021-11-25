import { BaseService } from "./BaseService";
import { Node } from "shared/interfaces";
import { BASE_URL } from "shared/constants";

export class NodeService extends BaseService<Node> {
  public async getNodes(): Promise<Node[]> {
    return this.getAll(`${BASE_URL}/nodes/`, "nodes");
  }
}
