import React from "react";
import AdminCheck from "../AdminCheck";

const RealtimeField: React.FC<{
  realtime: boolean;
  setRealtime: (realtime: boolean) => void;
}> = ({ realtime, setRealtime }) => {
  return (
    <div>
      <AdminCheck>
        <div className="flex space-x-2 items-center rounded">
          <div className="checkbox">
            <input
              id="realtime"
              type="checkbox"
              checked={realtime}
              onChange={() => setRealtime(!realtime)}
            />
            <label htmlFor="realtime" className="text-gray-300">
              Realtime
            </label>
          </div>
        </div>
      </AdminCheck>
    </div>
  );
};

export default RealtimeField;
